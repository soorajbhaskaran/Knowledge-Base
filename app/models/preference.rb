# frozen_string_literal: true

class Preference < ApplicationRecord
  has_secure_password
  validates :name, presence: true
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
