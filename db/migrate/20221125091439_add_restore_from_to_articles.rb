# frozen_string_literal: true

class AddRestoreFromToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :restored_from, :integer, default: nil
  end
end
