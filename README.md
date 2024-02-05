# Driver Application Class Diagram

```mermaid
classDiagram
    class DriverApp {
        +void login()
        +void logout()
        +void acceptRide()
        +void navigateToDestination()
        +void viewEarnings()
        +void updateProfile()
    }
    class LoginService {
        +String username
        +String password
        +boolean login(String, String)
        +void logout()
    }
    class RideService {
        +Ride currentRide
        +boolean acceptRide(Ride)
        +void completeRide()
    }
    class NavigationService {
        +void startNavigation(Destination)
        +void updateRoute(Route)
    }
    class EarningsService {
        +Earnings earnings
        +Earnings viewEarnings()
    }
    class ProfileService {
        +Profile profile
        +void updateProfile(Profile)
    }
    class Ride {
        -String id
        -String pickupLocation
        -String dropoffLocation
    }
    class Destination {
        -String address
        -double latitude
        -double longitude
    }
    class Route {
        -List<Destination> destinations
    }
    class Profile {
        -String name
        -String email
        -String phoneNumber
    }
    DriverApp --> LoginService : Uses
    DriverApp --> RideService : Uses
    DriverApp --> NavigationService : Uses
    DriverApp --> EarningsService : Uses
    DriverApp --> ProfileService : Uses

    FA4 -->|interacts with| BE2
    BE1 -->|reads/writes to| DB
    BE2 -->|reads/writes to| DB
