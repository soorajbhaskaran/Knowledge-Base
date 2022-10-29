# frozen_string_literal: true

class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles, id: :uuid do |t|
      t.string :title, null: false
      t.uuid :author_id, null: false
      t.uuid :category_id, null: false
      t.text :content, null: false
      t.string :status, default: "draft"

      t.timestamps
    end
  end
end
