# frozen_string_literal: true

class Preference < ApplicationRecord
  MINIMUM_PREFERENCE_PASSWORD_LENGTH = 6

  has_secure_password
  validates :name, presence: true
  validates :password, length: { minimum: MINIMUM_PREFERENCE_PASSWORD_LENGTH }, if: -> { password.present? }
end
