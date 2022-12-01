# frozen_string_literal: true

class ChangeRestoredFromIntegerToDatetimeInArticles < ActiveRecord::Migration[6.1]
  def up
    add_column :articles, :restored_from_timestamp, :datetime
    Article.where.not(restored_from: nil).each do |article|
      article.update!(restored_from_timestamp: DateTime.parse(article.versions.find(article.restored_from).created_at))
    end
    remove_column :articles, :restored_from
  end

  def down
    add_column :articles, :restored_from, :integer
    Article.where.not(restored_from_timestamp: nil).each do |article|
      article.update!(restored_from: article.versions.find_by(created_at: article.restored_from_timestamp).id)
    end
    remove_column :articles, :restored_from_timestamp
  end
end
