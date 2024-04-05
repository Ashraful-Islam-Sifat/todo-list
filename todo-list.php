<?php
/**
 * Plugin Name:       Todo List
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Sifat
 * License:           GPL-2.0-or-later
 * Text Domain:       todo-list
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function create_block_todo_list_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_todo_list_block_init' );
