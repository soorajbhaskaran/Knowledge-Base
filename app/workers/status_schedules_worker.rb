# frozen_string_literal: true

class StatusSchedulesWorker
  include Sidekiq::Worker

  def perform
    status_scheule_service = StatusSchedulesService.new
    status_scheule_service.process
  end
end
