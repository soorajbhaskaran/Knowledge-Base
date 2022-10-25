# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from_path, presence: true, uniqueness: true
  validates :to_path, presence: true
  validate :from_path_and_to_path_cannot_be_same
  validate :check_redirection_loop
  validate :check_redirection_not_possible_to_admin

  private

    def from_path_and_to_path_cannot_be_same
      errors.add(:from_path, "and to path cannot be same") if from_path == to_path
    end

    def check_redirection_loop
      return if Redirection.where(from_path: to_path).empty?

      errors.add(:to_path, "cannot be redirected to another path")
    end

    def check_redirection_not_possible_to_admin
      errors.add(:to_path, "cannot be redirected to protected path") if to_path.start_with?("/admin")
    end
end
