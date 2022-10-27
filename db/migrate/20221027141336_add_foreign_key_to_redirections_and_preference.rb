# frozen_string_literal: true

class AddForeignKeyToRedirectionsAndPreference < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :redirections, :users, column: :author_id
    add_foreign_key :preferences, :users, column: :author_id
    add_index :redirections, :author_id
  end
end
