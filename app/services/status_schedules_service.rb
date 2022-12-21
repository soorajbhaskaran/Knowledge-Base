# frozen_string_literal: true

class StatusSchedulesService
  attr_reader :status_schedules

  def initialize
    @status_schedules = get_status_schedules
  end

  def process
    update_articles_status if status_schedules.present?
  end

  private

    def get_status_schedules
      get_schedules_one_hour_less_than_now.where(queued: false)
    end

    def update_articles_status
      status_schedules.each do |status_schedule|
        ArticleUpdateWorker.perform_in(status_schedule.scheduled_at, status_schedule.id)
        status_schedule.update!(queued: true)
      end
    end

    def get_schedules_one_hour_less_than_now
      Schedule.where("scheduled_at <= ?", Time.zone.now + 1.hour)
    end
end
