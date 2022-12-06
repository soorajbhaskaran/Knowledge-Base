# frozen_string_literal: true

class RemoveVisitsFromArticles < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :visits, :integer
    remove_column :visits, :visited_date, :date
    remove_column :visits, :count, :integer
  end
end
