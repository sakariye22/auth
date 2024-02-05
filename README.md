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

#SYSTEM Architecture Diagram

graph TD
    subgraph Frontend Applications
        FA1(ADMIN App 1)
        FA2(DRIVER App 2)
        FA3(CUSTOMER App 3)
        FA4(MEMBER App 4)
    end
    subgraph Backend Systems
        BE1[Backend System 1 - Authentication]
        BE2[Backend System 2 - Business Logic]
    end
    DB[(MongoDB Database)]
    FA1 -->|interacts with| BE1
    FA1 -->|interacts with| BE2
    FA2 -->|interacts with| BE1
    FA2 -->|interacts with| BE2
    FA3 -->|interacts with| BE1
    FA3 -->|interacts with| BE2
    FA4 -->|interacts with| BE1
    FA4 -->|interacts with| BE2
    BE1 -->|reads/writes to| DB
    BE2 -->|reads/writes to| DB
