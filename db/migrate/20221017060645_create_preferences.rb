# frozen_string_literal: true

class CreatePreferences < ActiveRecord::Migration[6.1]
  def change
    create_table :preferences, id: :uuid do |t|
    t.string :name
    t.string :password_digest
    t.boolean :is_password_protection_enabled, default: false

    t.timestamps
  end
  end
end
