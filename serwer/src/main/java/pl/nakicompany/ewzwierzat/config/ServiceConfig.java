package pl.nakicompany.ewzwierzat.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "pl.nakicompany.ewzwierzat.service.")
public class ServiceConfig {
}
