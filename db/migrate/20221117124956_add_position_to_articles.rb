# frozen_string_literal: true

class AddPositionToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :position, :integer, default: 0
  end
end
