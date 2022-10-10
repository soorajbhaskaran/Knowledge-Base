# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users, id: :uuid do |t|
      t.string :first_name, null: false
      t.string :last_name
      t.string :email, null: false, index: { unique: false }
      t.string :password, null: false
      t.string :password_confirmation
      t.string :role

      t.timestamps
    end
  end
end
