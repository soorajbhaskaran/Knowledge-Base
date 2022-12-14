# frozen_string_literal: true

json.schedules @schedules do |schedule|
  json.extract! schedule, :id, :scheduled_at, :status
end
