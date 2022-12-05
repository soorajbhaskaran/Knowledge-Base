# frozen_string_literal: true

json.organization do
  json.extract! @_current_organization , :id, :name, :is_password_protection_enabled, :password
end
