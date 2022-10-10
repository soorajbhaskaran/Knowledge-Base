# frozen_string_literal: true

class SeedSlugValueForExistingArticles < ActiveRecord::Migration[6.1]
  def up
    Article.find_each do |article|
      article.send(:set_slug)
      article.save(validate: false)
    end
  end

  def down
    Article.find_each do |article|
      article.update(slug: nil)
      article.save(validate: false)
    end
  end
end
