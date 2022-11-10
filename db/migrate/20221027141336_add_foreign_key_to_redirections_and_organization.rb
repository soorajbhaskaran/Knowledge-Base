# frozen_string_literal: true

class AddForeignKeyToRedirectionsAndOrganization < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :redirections, :users, column: :author_id
    add_foreign_key :users, :organizations, column: :organization_id
    add_index :redirections, :author_id
  end
end
