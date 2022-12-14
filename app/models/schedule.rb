# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :article

  validates :scheduled_at, presence: true

  def remove_job_from_queue
    scheduled_queue = Sidekiq::ScheduledSet.new
    scheduled_queue.scan("ArticleUpdateWorker").each do |job|
      job.delete if job.args.last == self.id
    end
  end
end
