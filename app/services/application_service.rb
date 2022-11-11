# frozen_string_literal: true

class ApplicationService
  def current_user
    @_current_user ||= User.first
  end
end
