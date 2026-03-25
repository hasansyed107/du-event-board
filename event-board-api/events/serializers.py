from rest_framework import serializers
from events.models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Event

    def validate_capacity(self, value):
        if value is not None and value <= 0:
            raise serializers.ValidationError(
                "Capacity must be greater than 0."
            )
        return value