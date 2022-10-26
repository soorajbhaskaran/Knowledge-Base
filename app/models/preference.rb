# frozen_string_literal: true

class Preference < ApplicationRecord
  MINIMUM_PREFERENCE_PASSWORD_LENGTH = 6
  VALID_PASSWORD_REGEX = /([a-z]+[0-9]+)|([0-9]+[a-z]+)/i

  has_secure_password
  has_secure_token :authentication_token
  validates :name, presence: true
  validates :password,
    length: { minimum: MINIMUM_PREFERENCE_PASSWORD_LENGTH },
    format: { with: VALID_PASSWORD_REGEX }, if: -> { password.present? }
end
