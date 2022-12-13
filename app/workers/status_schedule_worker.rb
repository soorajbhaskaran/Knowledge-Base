# frozen_string_literal: true

class StatusScheduleWorker
  include Sidekiq::Worker

  def perform
    status_scheule_service = StatusScheduleService.new
    status_scheule_service.process
  end
end
