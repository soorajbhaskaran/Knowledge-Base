# frozen_string_literal: true

FactoryBot.define do
  factory :preference do
    name { Faker::Name.name[0..14] }
    password { Faker::Name.name[6..] }
  end
end
