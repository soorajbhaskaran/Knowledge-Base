# frozen_string_literal: true

class AddForeignKeyToCategory < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :categories, :users, column: :author_id
  end
end
