from abc import ABC, abstractmethod


class Results(ABC):

    @abstractmethod
    def get_results(self, sample_data, **kwargs):
        """
        
        """
        pass


class AbstractResults(Results):

    @abstractmethod
    def get_results(self, sample_data, **kwargs):
        """
        
        """
        raise NotImplementedError
