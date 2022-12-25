# frozen_string_literal: true

class RemoveUserIdFromRedirection < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :redirections, :users
    remove_column :redirections, :user_id, :uuid
  end
end
