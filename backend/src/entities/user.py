class User:
    def __init__(self, parameters: dict = None):
        self._name = parameters.get('name', None)
        self._age = parameters.get('age', None)
        self._gender = parameters.get('gender', None)


    def create_attributes(self, attributes: dict):
        for key, value in attributes.items():
            setattr(self, key, value)
    @property
    def name(self):
        return self._name

    @property
    def age(self):
        return self._age

    @property
    def gender(self):
        return self._gender