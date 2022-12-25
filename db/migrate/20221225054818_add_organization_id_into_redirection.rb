# frozen_string_literal: true

class AddOrganizationIdIntoRedirection < ActiveRecord::Migration[6.1]
  def change
    add_column :redirections, :organization_id, :uuid
    add_foreign_key :redirections, :organizations
    add_index :redirections, :organization_id
  end
end
