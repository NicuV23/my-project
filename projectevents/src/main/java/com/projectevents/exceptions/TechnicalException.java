package com.projectevents.exceptions;

public class TechnicalException extends RuntimeException {
    private static final long serialVersionUID = 1L; 
    public TechnicalException(String message) {
        super(message);
    }
}
