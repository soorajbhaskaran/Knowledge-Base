# frozen_string_literal: true

class RenameColumnsOfArticles < ActiveRecord::Migration[6.1]
  def up
    rename_column :articles, :category, :category_id
    rename_column :articles, :author, :author_id
  end

  def down
    rename_column :articles, :category_id, :category
    rename_column :articles, :author_id, :author
  end
end
