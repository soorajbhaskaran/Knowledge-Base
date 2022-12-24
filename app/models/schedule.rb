# frozen_string_literal: true

require "sidekiq/api"

class Schedule < ApplicationRecord
  belongs_to :article

  validates :scheduled_at, presence: true
  validate :schedule_cannot_be_in_the_past, on: :create
  validate :status_cannot_be_the_same, on: :create

  before_destroy :remove_job_from_queue, prepend: true

  private

    def remove_job_from_queue
      scheduled_queue = Sidekiq::ScheduledSet.new
      scheduled_queue.scan("ArticleUpdateWorker").each do |job|
        job.delete if job.args.last == self.id
      end
    end

    def schedule_cannot_be_in_the_past
      return unless scheduled_at.past?

      errors.add(:scheduled_at, t("schedules.not_past"))
    end

    def status_cannot_be_the_same
      return unless status == article.status

      errors.add(:status, t("schedules.not_same_status"))
    end
end
