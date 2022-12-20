# frozen_string_literal: true

class ArticleUpdateWorker
  include Sidekiq::Worker

  def perform(schedule_id)
    schedule = Schedule.find(schedule_id)
    article = Article.find(schedule.article_id)
    if article.update! status: schedule.status, restored_from: nil
      schedule.update! executed: true
    end
  end
end
