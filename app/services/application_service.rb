# frozen_string_literal: true

class ApplicationService
  def self.process(*args)
    new(*args).process
  end

  def current_user
    @_current_user ||= User.first
  end
end
