# frozen_string_literal: true

class AddArticlesCountToCategory < ActiveRecord::Migration[6.1]
  def up
    add_column :categories, :articles_count, :integer, default: 0
  end

  def down
    remove_column :categories, :articles_count
  end
end
