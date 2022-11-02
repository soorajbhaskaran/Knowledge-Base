# frozen_string_literal: true

FactoryBot.define do
  factory :preference do
    name { Faker::Name.name[0..14] }
    password { "password12345" }
    is_password_protection_enabled { false }
    association :author, factory: :user
  end
end
