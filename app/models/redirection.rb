# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :user

  validates :from_path, presence: true, uniqueness: true
  validates :to_path, presence: true
  validate :from_path_and_to_path_cannot_be_same
  validate :check_redirection_not_possible_to_admin

  private

    def from_path_and_to_path_cannot_be_same
      errors.add(:from_path, t("redirections.not_same")) if from_path == to_path
    end

    def check_redirection_not_possible_to_admin
      errors.add(:to_path, t("redirections.not_cyclic")) if to_path.start_with?("admin")
    end
end
