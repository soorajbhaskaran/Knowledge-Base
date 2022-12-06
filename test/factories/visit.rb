# frozen_string_literal: true

FactoryBot.define do
  factory :visit do
    association :article, factory: :article
  end
end
