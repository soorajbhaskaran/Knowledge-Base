# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from_path, presence: true, uniqueness: true
  validates :to_path, presence: true
end
