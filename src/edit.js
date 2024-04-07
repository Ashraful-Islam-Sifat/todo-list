import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { useSelect, useDispatch } from '@wordpress/data';
import { CheckboxControl } from '@wordpress/components';
import { TextControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit() {

	const [newTodo, setNewTodo] = useState('');
	const [addingTodo, setAddingTodo] = useState(false);

	const todos = useSelect((select) => {
		const todosStore =  select('block-course/todos');
		return todosStore && todosStore.getTodos();
	}, []);

	const actions = useDispatch('block-course/todos');
	const addTodo = actions && actions.addTodo;
	const toggleTodo = actions && actions.toggleTodo;

	return (
		<div { ...useBlockProps() }>
			{!todos && 
			
			    <p>
					{__('Please make sure your plugin is activated', 'todo-list')}
				</p>
			}
			{todos && 
			    <>
				    <ul>
				    	{todos.map((todo, index)=> (
				    		<li key={todo.id}>
				    			<CheckboxControl 
				    			    label= {todo.title}
									disabled={todo.loading}
				    				checked= {todo.completed}
				    				onChange={()=> {
										if(toggleTodo){
											toggleTodo(todo, index);
										}
									}}
				    			/>
				    		</li>
				    	))}
				    </ul>
				    <form className='addtodo-form'
					    onSubmit={async (e)=> {
							e.preventDefault();
							if(addTodo && newTodo) {
								setAddingTodo(true);
							    await addTodo(newTodo);
								setNewTodo('');
								setAddingTodo(false);
							} 
							
						}}
					>
						<TextControl 
						    value={newTodo}
							onChange={(e)=> setNewTodo(e)}
						/>
						<Button disabled={addingTodo} type='submit' className='is-primary'>{__('Add Todo', 'todo-list')}</Button>
				    </form>
			    </>
			}
		</div>
	);
}
