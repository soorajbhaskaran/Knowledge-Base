# frozen_string_literal: true

class ArticleUpdateWorker
  include Sidekiq::Worker

  def perform(article_id, status, schedule_id)
    article = Article.find(article_id)
    if article.update(status: status)
      Schedule.find(schedule_id).update(executed: true)
    end
  end
end
