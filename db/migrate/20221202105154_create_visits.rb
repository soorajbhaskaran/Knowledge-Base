# frozen_string_literal: true

class CreateVisits < ActiveRecord::Migration[6.1]
  def change
    create_table :visits, id: :uuid do |t|
      t.date :visited_date, null: false
      t.references :article, null: false, foreign_key: true, type: :uuid
      t.integer :count, null: false, default: 0

      t.timestamps
    end
  end
end
