# frozen_string_literal: true

FactoryBot.define do
  factory :visit do
    count { Faker::Number.number(digits: 2) }
    association :article, factory: :article
  end
end
