package unoeste.fipp.webmovies.restcontrollers;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/imagens")
public class ThumbnailController {

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Caminho para salvar a thumbnail
            String thumbName = "thumb_" + file.getOriginalFilename();
            File outputFile = new File("uploads/" + thumbName);

            // Criar a thumbnail (ex: 200x200)
            Thumbnails.of(file.getInputStream())
                    .size(200, 200)
                    .outputFormat("jpg")
                    .toFile(outputFile);

            return ResponseEntity.ok("Thumbnail criada: " + thumbName);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erro ao criar thumbnail");
        }
    }
}
