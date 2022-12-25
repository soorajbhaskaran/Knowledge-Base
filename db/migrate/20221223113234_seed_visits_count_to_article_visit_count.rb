# frozen_string_literal: true

class SeedVisitsCountToArticleVisitCount < ActiveRecord::Migration[6.1]
  def up
    Article.find_each do |article|
      Article.reset_counters(article.id, :visits)
    end
  end

  def down
    Article.update_all(visits_count: 0)
  end
end
