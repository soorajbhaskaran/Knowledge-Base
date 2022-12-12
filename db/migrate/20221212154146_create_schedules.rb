# frozen_string_literal: true

class CreateSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :schedules, id: :uuid do |t|
      t.datetime :scheduled_at
      t.references :article, null: false, foreign_key: true, type: :uuid
      t.boolean :executed, default: false

      t.timestamps
    end
  end
end
