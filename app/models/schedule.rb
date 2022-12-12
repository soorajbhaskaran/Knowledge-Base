# frozen_string_literal: true

class Schedule < ApplicationRecord
  belongs_to :article
  validates :scheduled_at, presence: true
end
