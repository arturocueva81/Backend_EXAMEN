package com.examen.reciclaje.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examen.reciclaje.entidades.PuntoReciclaje;
import com.examen.reciclaje.repositories.PuntoReciclajeRepository;

@RestController
@RequestMapping("/api/puntos")
@CrossOrigin(origins = "http://localhost:5173")
public class PuntoReciclajeController {
	
	private final PuntoReciclajeRepository repository;
	
	public PuntoReciclajeController(PuntoReciclajeRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping
	public List<PuntoReciclaje> listar() {
		return repository.findAll();
	}
	
	@PostMapping
	public ResponseEntity<?> guardar(@RequestBody PuntoReciclaje punto) {
		try {
			PuntoReciclaje guardado = repository.save(punto);
			return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se pudo guardar el punto: " + e.getMessage());
		}
	}

}
