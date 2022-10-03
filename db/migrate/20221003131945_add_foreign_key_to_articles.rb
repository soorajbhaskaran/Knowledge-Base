# frozen_string_literal: true

class AddForeignKeyToArticles < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :articles, :categories, column: :category_id
    add_foreign_key :articles, :users, column: :author_id
    add_index :articles, :category_id
  end
end
