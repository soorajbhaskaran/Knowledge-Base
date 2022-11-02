# frozen_string_literal: true

class Preference < ApplicationRecord
  MINIMUM_PREFERENCE_PASSWORD_LENGTH = 6
  VALID_PASSWORD_REGEX = /([a-z]+[0-9]+)|([0-9]+[a-z]+)/i

  has_secure_password
  has_secure_token :authentication_token
  belongs_to :author, class_name: "User", foreign_key: "author_id"
  validates :name, presence: true
  validates :password,
    length: { minimum: MINIMUM_PREFERENCE_PASSWORD_LENGTH },
    format: { with: VALID_PASSWORD_REGEX }, if: -> { password.present? && is_password_protection_enabled }
end
