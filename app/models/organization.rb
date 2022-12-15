# frozen_string_literal: true

class Organization < ApplicationRecord
  MINIMUM_ORGANIZATION_PASSWORD_LENGTH = 6
  VALID_PASSWORD_REGEX = /([a-z]+[0-9]+)|([0-9]+[a-z]+)/i

  has_many :users, dependent: :destroy

  validates :name, presence: true
  validates :password,
    length: { minimum: MINIMUM_ORGANIZATION_PASSWORD_LENGTH },
    format: { with: VALID_PASSWORD_REGEX }, if: -> { password.present? && is_password_protection_enabled }

  has_secure_password
  has_secure_token :authentication_token
end
